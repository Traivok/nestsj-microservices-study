import { Injectable }                                 from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService }                              from "@nestjs/config";

@Injectable()
export class ClientProxiesService {
  private readonly adminBE: ClientProxy;
  private readonly challengeBE: ClientProxy;
  private readonly rankingBE: ClientProxy;

  constructor(private readonly config: ConfigService) {
    this.adminBE     = this.createInstance("admin-backend");
    this.challengeBE = this.createInstance("challenge-backend");
    this.rankingBE   = this.createInstance("ranking-backend");
  }

  get adminClient(): ClientProxy {
    return this.adminBE;
  }

  get challengeClient(): ClientProxy {
    return this.challengeBE;
  }

  get rankingClient(): ClientProxy {
    return this.rankingBE;
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
