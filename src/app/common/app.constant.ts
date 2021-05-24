export class AppConstant {
    private static API_BASE_URL = "https://spring-kopi.herokuapp.com/";
    private static OAUTH2_URL = AppConstant.API_BASE_URL + "oauth2/authorization/";
    private static REDIRECT_URL = "?redirect_uri=https://spring-kopi.herokuapp.com/login";
    public static API_URL = AppConstant.API_BASE_URL + "api/";
    public static AUTH_API = AppConstant.API_URL + "auth/";
    public static GOOGLE_AUTH_URL = AppConstant.OAUTH2_URL + "google" + AppConstant.REDIRECT_URL;
    public static FACEBOOK_AUTH_URL = AppConstant.OAUTH2_URL + "facebook" + AppConstant.REDIRECT_URL;
    public static GITHUB_AUTH_URL = AppConstant.OAUTH2_URL + "github" + AppConstant.REDIRECT_URL;
    public static LINKEDIN_AUTH_URL = AppConstant.OAUTH2_URL + "linkedin" + AppConstant.REDIRECT_URL;
}