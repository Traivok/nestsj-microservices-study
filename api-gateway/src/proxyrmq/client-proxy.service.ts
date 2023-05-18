import { Injectable }                      from '@nestjs/common';
import { ConfigService }                              from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxyService {
  constructor(private readonly config: ConfigService) {}

  getClientProxyAdminBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:   {
        urls:  [ this.config.getOrThrow<string>("RMQ_URL") ],
        queue: "admin-backend",
        queueOptions: {
          durable: false,
        }
      }
    });
  }
}
