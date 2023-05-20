import { Injectable }                                             from "@nestjs/common";
import { ConfigService }                                          from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxyService {
  private readonly adminBE: ClientProxy;
  private readonly challengeBE: ClientProxy;

  constructor(private readonly config: ConfigService) {
    this.adminBE = this.createInstance("admin-backend");
    this.challengeBE = this.createInstance("challenge-backend");
  }

  get adminClient(): ClientProxy {
    return this.adminBE;
  }

  get challengeClient(): ClientProxy {
    return this.challengeBE;
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
