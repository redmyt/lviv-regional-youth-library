class GoogleOAuthError(BaseException):
    message = ""

    def __str__(self):
        return f"{self.message} Arguments: {self.args}"


class GoogleOAuthSessionDoesNotExist(GoogleOAuthError):
    message = "GoogleOAuth session object does not exist."


class GoogleOAuthTokenGenerationError(GoogleOAuthError):
    message = "Cannot generate access token for accepted auth code."


class GoogleOAuthRefreshTokenError(GoogleOAuthError):
    message = "Cannot refresh access token."


class GoogleOAuthScopesDontMatchError(GoogleOAuthError):
    message = "Provider and Google OAuth credential scopes do not match."
