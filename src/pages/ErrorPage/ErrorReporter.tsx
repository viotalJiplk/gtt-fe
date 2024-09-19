function report(msg: string, hint: string = ""): never{
    const errorUrl = new URL(window.location.origin + "/error");
    errorUrl.searchParams.set("errordescr", msg);
    errorUrl.searchParams.set("hint", hint);
    window.location.href = errorUrl.href;
    throw new Error("Redirection to error page.");  // To enforce the never type
}

export default report;