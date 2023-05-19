import { Injectable }                                             from "@nestjs/common";
import { ConfigService }                                          from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxyService {
  constructor(private readonly config: ConfigService) {}

  createClientProxyAdminBackend(): ClientProxy {
    return this.createInstance("admin-backend");
  }

  createClientProxyChallengeBackend(): ClientProxy {
    return this.createInstance("challenge-backend");
  }

  private createInstance(queue: string, queueOptions: Record<string, unknown> = { durable: false }) {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:   {
        urls: [ this.config.getOrThrow<string>("RMQ_URL") ],
        queue,
        queueOptions
      }
    });
  }
}
