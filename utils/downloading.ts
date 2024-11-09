export const download = (routeLink: string) => {
    return (fileName: string) => {
        const link = document.createElement("a");
        link.href = `${routeLink}/${fileName}`;
        link.download = `${fileName}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};

export const download_launcher = download(process.env.DOMAIN_URL_IMAGES as string);