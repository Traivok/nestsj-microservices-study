import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, of, throwError }                                            from "rxjs";

@Injectable()
export class RpcExceptionsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RpcExceptionsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(exception => {
        if (exception instanceof HttpException)
          return throwError(() => exception);

        const status = typeof exception === "object" ? ( exception.error?.status ?? 500 ) : 500;

        return throwError(() => new HttpException(null, status));
      })
    );
  }
}
