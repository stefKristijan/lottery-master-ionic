// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // lotteryUrl : 'http://192.168.0.15:8080/api/lottery',
  // remoteUrl : 'http://192.168.0.15:8080/api',
  lotteryUrl: 'http://18.194.88.128:9090/api/lottery',
  remoteUrl: 'http://18.194.88.128:9090/api',
  public_key: 'pk_test_dsYZN1QfgxmZ0CA6M3kgEJ0n00VpCLH7Ny'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
