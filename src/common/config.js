export const ConstConfig = {
    ENV: 1,
    HTTP_TIME_OUT: 10,
    SUCCESS_CODE: 'k-000000',
}
export const config = (
    () => {
        switch (ConstConfig.ENV) {
            case 1:
                return {
                    // binghambai 机器
                    HOST: 'http://172.16.37.135:8090/api',
                };
            default:
                return {
                    HOST: 'http://localhost:8090/api',
                };
        }
    }
)();