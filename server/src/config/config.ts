import dotenv from "dotenv"

type TConfig = {
    [key: string]: EnvironmentConfig
}

type EnvironmentConfig = {
    app: AppConfig
}

type AppConfig = {
    PORT: string | number
}

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' })
} else {
    dotenv.config({ path: '.env.development' })
}

const ENV = process.env.NODE_ENV ?? "development"

const CONFIG: any = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }

    },
    production: {
        app: {
            PORT: process.env.PORT || 4002
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    }
}



export default CONFIG[ENV]