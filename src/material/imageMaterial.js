export class ImageMaterial {
    constructor(image, bFlipY = true) {
        this._image = image;
        this._bFlipY = bFlipY;
    }

    setup(gl) {
        if (this._texture) {
            return;
        }

        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        if (this._bFlipY) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        } else {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    bindTexture(gl, textureNo) {
        gl.activeTexture(textureNo);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    unBind(gl) {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}
