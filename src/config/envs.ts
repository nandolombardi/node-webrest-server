import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    PORT: get('PORT').required().asPortNumber(),
}