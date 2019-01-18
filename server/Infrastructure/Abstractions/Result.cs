using Brainvest.Dscribe.Abstractions.Helpers;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IResult
	{
		bool Succeeded { get; }
		ErrorResultType ErrorType { get; }
		string Message { get; }
		IDictionary<string, List<FieldError>> Errors { get; }
	}

	public interface IResult<out T> : IResult
	{
		T Data { get; }
	}

	public class Result : IResult
	{
		public bool Succeeded { get; set; }
		public ErrorResultType ErrorType { get; set; }
		public string Message { get; set; }
		public IDictionary<string, List<FieldError>> Errors { get; set; }

		public static Result Success()
		{
			return new Result { Succeeded = true };
		}
	}

	public class Result<T> : Result, IResult<T>
	{
		public T Data { get; set; }

		public static implicit operator Result<T>(T data)
		{
			return new Result<T> { Succeeded = true, Data = data };
		}

		public static implicit operator Result<T>(ModelStateDictionary modelState)
		{
			return new Result<T> { ErrorType = ErrorResultType.BadInput, Errors = modelState.ToDictionary() };
		}

		public static implicit operator Result<T>(Exception ex)
		{
			return new Result<T> { Message = ex.GetFullMessage() };
		}

		public static Result<T> Fail(ErrorResultType errorType, string message = null, ModelStateDictionary modelState = null)
		{
			return new Result<T> { ErrorType = errorType, Message = message, Errors = modelState?.ToDictionary() };
		}

	}

	public class FieldError
	{
		public string Message { get; set; }
	}

	public enum ErrorResultType
	{
		UnknownError = 1,
		BadInput,
		NotLoggedIn,
		PermissionDenied
	}
}