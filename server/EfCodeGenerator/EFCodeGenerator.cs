using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Brainvest.Dscribe.Abstractions.Metadata;
using Humanizer;
using Microsoft.CSharp;
using Microsoft.EntityFrameworkCore;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Composition;
using System.IO;
using System.Linq;
using System.Text;

namespace Brainvest.Dscribe.Implementations.Ef.CodeGenerator
{
	public class EFCodeGenerator : IBusinessCodeGenerator
	{
		public EFCodeGenerator()
		{
		}

		public CodeDomBusinessCode CreateCode(IMetadataCache cache, IInstanceInfo instanceInfo)
		{
			var compileUnit = new CodeCompileUnit();
			var codeNamespace = new CodeNamespace($"Brainvest.Dscribe{instanceInfo.InstanceName}.Business");
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(IDisposable).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(DbContext).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(IBusinessRepositoryFactory).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(TableAttribute).Namespace));
			codeNamespace.Imports.Add(new CodeNamespaceImport(typeof(ForeignKeyAttribute).Namespace));

			var codeDbContext = CreateDbContextCode();
			codeNamespace.Types.Add(codeDbContext);
			foreach (var type in cache)
			{
				AddTypeToDbContext(type, codeDbContext);
				var codeType = new CodeTypeDeclaration(type.Name);
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
					snippet.Text += $"		public {dataType} {property.Name} {{ get; set; }}";
					codeType.Members.Add(snippet);
				}
				codeNamespace.Types.Add(codeType);
			}
			var factoryCode = new CodeTypeDeclaration("DbContextFactory");
			factoryCode.BaseTypes.Add($"IBusinessRepositoryFactory");
			factoryCode.Members.Add(new CodeSnippetTypeMember("		public IDisposable GetDbContext(DbContextOptions options){ return new BusinessDbContext(options); }"));
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
				Text = $"		public DbSet<{type.Name}> {type.TableName ?? type.Name.Pluralize()} {{ get; set; }}"
			};
			codeDbContext.Members.Add(snippet);
		}

		private static CodeTypeDeclaration CreateDbContextCode()
		{
			var codeDbContext = new CodeTypeDeclaration("BusinessDbContext");
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