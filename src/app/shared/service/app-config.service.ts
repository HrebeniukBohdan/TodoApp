import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type ConfigObject = { [key: string]: any };

@Injectable()
export class AppConfig {
    private config: ConfigObject;

    constructor(private http: HttpClient) {}

    public getConfig<T extends ConfigObject>(): T {
      return this.config as T;
    }

    public load(): Promise<void> {
        const jsonFile = `assets/configs/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response) => {
               this.config = response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
