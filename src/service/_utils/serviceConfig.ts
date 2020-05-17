enum PathPrefix {
    API = 'api/',
    MOCKAPI = 'mockapi/',
}

enum ProtocolType {
    HTTPS = 'https:',
    HTTP = 'http:',
}

interface IConfig {
    host: String;
    pathPrefix: PathPrefix;
    protocol: ProtocolType;
    port: number;
}

const config: IConfig = {
    host: window.location.hostname,
    pathPrefix: process.env.NODE_ENV === 'development' ? PathPrefix.MOCKAPI : PathPrefix.API,
    protocol: process.env.NODE_ENV === 'development' ? ProtocolType.HTTP : ProtocolType.HTTPS,
    port: 8080
};

export function makeUrl(serviceUrl: string = ''): string {
    return `/${config.pathPrefix}${serviceUrl}`;
}
