import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response }                                      from "express";

@Catch()
export class RpcFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = typeof exception === "object" ? (exception.error?.status ?? 500) : 500;

    return response.status(status).json();
  }
}
