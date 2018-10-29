using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Humanizer;
using Microsoft.CSharp;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Composition;
using System.IO;

namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator
{
	public class EfCoreCodeGenerator
	{
		public EfCoreCodeGenerator()
		{
		}

		public CodeDomBusinessCode CreateCode(IMetadataCache cache, IInstanceInfo instanceInfo)
		{
			var compileUnit = new CodeCompileUnit();
			var codeNamespace = new CodeNamespace(instanceInfo.GeneratedCodeNamespace ?? $"Brainvest.Dscribe{instanceInfo.InstanceName}.Business");
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(IDisposable).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(DbContext).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(IBusinessRepositoryFactory).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(KeyAttribute).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(NotMappedAttribute).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(TableAttribute).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(ForeignKeyAttribute).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(JsonIgnoreAttribute).Namespace));

			var codeDbContext = CreateDbContextCode();
			codeNamespace.Types.Add(codeDbContext);
			foreach (var type in cache)
			{
				var primaryKey = type.GetPrimaryKey();
				var codeType = new CodeTypeDeclaration(type.Name)
				{
					IsPartial = true
				};
				if (primaryKey == null)
				{
					codeType.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(NotMappedAttribute))));
				}
				else
				{
					AddTypeToDbContext(type, codeDbContext);
				}
				if (!string.IsNullOrWhiteSpace(type.SchemaName) || !string.IsNullOrWhiteSpace(type.TableName))
				{
					if (string.IsNullOrWhiteSpace(type.SchemaName))
					{
						codeType.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(TableAttribute)),
							new CodeAttributeArgument(new CodePrimitiveExpression(type.TableName ?? type.Name.Pluralize()))));
					}
					else
					{
						codeType.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(TableAttribute)),
							new CodeAttributeArgument(new CodePrimitiveExpression(type.TableName ?? type.Name.Pluralize())),
							new CodeAttributeArgument("Schema", new CodePrimitiveExpression(type.SchemaName ?? "dbo"))
							));
					}
				}
				foreach (var property in type.GetDirectProperties())
				{
					if (property.IsExpression)
					{
						continue;
					}
					var snippet = new CodeSnippetTypeMember();

					string dataType;
					if (property.DataType == DataTypes.NavigationList)
					{
						snippet.Text += "		[JsonIgnore]" + Environment.NewLine;
						dataType = $"System.Collections.Generic.ICollection<{property.EntityTypeName}>";
					}
					else if (property.DataType == DataTypes.ForeignKey)
					{
						var propertyType = cache[property.EntityTypeName];
						dataType = propertyType.GetPrimaryKey().GetDataType().ClrType;
					}
					else
					{
						dataType = property.EntityTypeName ?? property.GetDataType().ClrType;
					}
					if (property.IsNullable && property.GetDataType().IsValueType)
					{
						dataType += "?";
					}
					if (property.InverseProperty != null)
					{
						snippet.Text += $"		[InverseProperty(\"{property.InverseProperty.Name}\")]\n";
					}
					if (property.ForeignKey != null)
					{
						snippet.Text += $"		[ForeignKey(\"{property.ForeignKey.Name}\")]\n";
					}
					if (property == primaryKey)
					{
						snippet.Text += "		[Key]\n";
					}
					snippet.Text += $"		public virtual {dataType} {property.Name} {{ get; set; }}";
					codeType.Members.Add(snippet);
				}
				codeNamespace.Types.Add(codeType);
			}
			var factoryCode = new CodeTypeDeclaration("DbContextFactory")
			{
				IsPartial = true
			};
			factoryCode.BaseTypes.Add($"IBusinessRepositoryFactory");
			factoryCode.Members.Add(new CodeSnippetTypeMember("		public virtual IDisposable GetDbContext(DbContextOptions options){ return new BusinessDbContext(options); }"));
			factoryCode.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(ExportAttribute)),
				new CodeAttributeArgument(new CodeSnippetExpression("typeof(IBusinessRepositoryFactory)"))));
			codeNamespace.Types.Add(factoryCode);
			compileUnit.Namespaces.Add(codeNamespace);
			return new CodeDomBusinessCode { Code = compileUnit };
		}

		private static void AddTypeToDbContext(IEntityMetadata type, CodeTypeDeclaration codeDbContext)
		{
			var snippet = new CodeSnippetTypeMember
			{
				Text = $"		public virtual DbSet<{type.Name}> {type.TableName ?? type.Name.Pluralize()} {{ get; set; }}"
			};
			codeDbContext.Members.Add(snippet);
		}

		private static CodeTypeDeclaration CreateDbContextCode()
		{
			var codeDbContext = new CodeTypeDeclaration("BusinessDbContext")
			{
				IsPartial = true
			};
			codeDbContext.BaseTypes.Add(new CodeTypeReference(typeof(DbContext)));
			var constructor = new CodeConstructor
			{
				Attributes = MemberAttributes.Public
			};
			var optionsParameter = new CodeParameterDeclarationExpression("DbContextOptions", "options");
			constructor.Parameters.Add(optionsParameter);
			constructor.BaseConstructorArgs.Add(new CodeVariableReferenceExpression("options"));
			codeDbContext.Members.Add(constructor);
			return codeDbContext;
		}

		public void GenerateSourceCode(CodeDomBusinessCode code, string fileName)
		{
			var provider = new CSharpCodeProvider();
			using (var fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write))
			using (var streamWriter = new StreamWriter(fileStream))
			{
				var codeWriter = new IndentedTextWriter(streamWriter, "	");
				provider.GenerateCodeFromCompileUnit(code.Code, codeWriter, new CodeGeneratorOptions
				{
					IndentString = "	"
				});
				codeWriter.Close();
			}
		}
	}
}