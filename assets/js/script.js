const Page = {
    html: "",
    replaceList: [
        {
            find: () => "{{age}}",
            replace: () => (new Date().getMonth() < 9) ? new Date().getFullYear() - 2004 : new Date().getFullYear() - 2003
        },
        {
            find: () => "{{nickname}}",
            replace: () => "Type"
        },
        {
            find: () => "{{profileImage}}",
            replace: () => "assets/images/profile.jpg"
        },
        {
            find: () => "{{dockerTitle}}",
            replace: () => "~ gsnasc/website"
        },
        {
            find: () => "{{title}}",
            replace: () => "gsnasc"
        },
        {
            find: () => "{{occup}}",
            replace: () => "Software Engineer"
        },
        {
            find: () => "{{country}}",
            replace: () => "Brazil|🇧🇷"
        },
        {
            find: () => "{{cite1}}",
            replace: () => `"So if you don't know what you need, you can leave it all to me, don't want you worried 'bout a thing"`
        },
        {
            find: () => "{{cite2}}",
            replace: () => `"Às vezes você nunca saberá o valor de um momento, até que ele se torne uma memória."`
        },
        {
            find: () => "{{cite3}}",
            replace: () => `"But I can't help it, I'm falling for you, and I can't quit it, 'cause I'm stuck on you"`
        },
        {
            find: () => "{{year}}",
            replace: () => new Date().getFullYear()
        },
        {
            find: () => "{{bannerImage}}",
            replace: () => `assets/images/banner.gif`
        }
    ],
    setup: () => {
        document.querySelectorAll("html").forEach(elm => {
            var html = elm.innerHTML;
    
            Page.replaceList.map(item => {
                html = html.replaceAll(item.find(), item.replace());
            });
    
            elm.innerHTML = html;
        });
    }
};

(() => {
    Page.setup();
})();
