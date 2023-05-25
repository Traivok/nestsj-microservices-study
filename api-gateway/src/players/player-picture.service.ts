import { Injectable, Logger } from "@nestjs/common";
import FormData               from "form-data";
import { map, Observable }    from "rxjs";
import { HttpService }        from "@nestjs/axios";
import { ConfigService }      from "@nestjs/config";
import { Express }            from "express";
import { PlayerPictureDto }   from "models";
import { ClientProxiesService } from "rmq-proxies";

@Injectable()
export class PlayerPictureService {
  private readonly logger = new Logger(PlayerPictureService.name);
  private readonly pictureHostingUrl: string;

  constructor(private readonly clientProxies: ClientProxiesService,
              private readonly httpClient: HttpService,
              private readonly config: ConfigService) {

    const imgbbPK          = this.config.getOrThrow<string>("IMGBB_PK");
    this.pictureHostingUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${ imgbbPK }`;
  }

  uploadProfilePic(file: Express.Multer.File, playerId: string): Observable<PlayerPictureDto> {
    const formData = new FormData();
    // attach buffer to form data
    formData.append("image", file.buffer, { filename: `${playerId}-profile-ic` });

    return this.httpClient
      .post<{ data: PlayerPictureDto }>(this.pictureHostingUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          // get the POST content length
          "Content-Length": formData.getLengthSync()
        }
      })
      .pipe(map(axiosResponse => axiosResponse.data.data));

  }
}
