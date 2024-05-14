export default function getCroppedImg(imageSrc: string, croppedAreaPixels: any): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageSrc;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    return new Promise(resolve => {
        image.onload = () => {
            if (ctx && image) {
                ctx.drawImage(
                    image,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                );

                canvas.toBlob(blob => {
                    if (blob) {
                        resolve(blob);
                    }
                });
            }
        };
    });
}
