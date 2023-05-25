import { Catch, HttpStatus, Logger, RpcExceptionFilter } from "@nestjs/common";
import { throwError }                                    from "rxjs";
import mongoose                                          from "mongoose";
import { RpcException }                                  from "@nestjs/microservices";

@Catch(mongoose.mongo.MongoServerError)
export class DuplicateKeyFilter implements RpcExceptionFilter<mongoose.mongo.MongoServerError> {
  private readonly logger             = new Logger(DuplicateKeyFilter.name);
  private readonly DUPLICATE_KEY_CODE = 11000 as const;

  catch(exception: mongoose.mongo.MongoServerError) {
    if (exception.code !== this.DUPLICATE_KEY_CODE) {
      this.logger.error("Unknown error:", exception);
    }

    return throwError(() => new RpcException({
      status: HttpStatus.CONFLICT, error: exception.name
    }));
  }
}
