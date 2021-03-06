enum PathPrefix {
    API = 'api/',
    MOCKAPI = 'mockapi/',
}

enum ProtocolType {
    HTTPS = 'https:',
    HTTP = 'http:',
}

interface IConfig {
    host: string;
    pathPrefix: PathPrefix;
    protocol: ProtocolType;
    port: string;
}

export const config: IConfig = {
    host: window.location.hostname,
    pathPrefix: process.env.NODE_ENV === 'development' ? PathPrefix.MOCKAPI : PathPrefix.API,
    protocol: process.env.NODE_ENV === 'development' ? ProtocolType.HTTP : ProtocolType.HTTPS,
    port: location.port
};

