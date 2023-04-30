import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, timeout }                                        from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  /**
   *
   * @param {number} timeout - Time in Milliseconds to throw a Timeout Error
   */
  constructor(public timeout = 10_000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(10_000));
  }
}
