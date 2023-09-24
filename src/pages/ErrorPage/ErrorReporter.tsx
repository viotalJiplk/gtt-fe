function report(msg: string){
    const errorUrl = new URL(window.location.origin + "/error");
    errorUrl.searchParams.set("errordescr", msg);
    window.location.href = errorUrl.href;
}

export default report;