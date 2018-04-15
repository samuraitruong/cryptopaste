import forge from 'node-forge'

export class Encryption {
    constructor() {
        this._keyLength = 256
        this._mode = 'AES-CBC'
    }
    encrypt(text, password) {
        const salt = forge.random.getBytesSync(this._keyLength)
        const key = forge.pkcs5.pbkdf2(password, salt, 40, 16)
        const iv = forge.random.getBytesSync(this._keyLength/8)
        const cipher = forge.cipher.createCipher(this._mode, key)
        cipher.start({iv: iv})
        cipher.update(forge.util.createBuffer(text))
        cipher.finish()
        const cipherText = forge.util.encode64(cipher.output.getBytes())

        return {
            text: cipherText,
            iv : forge.util.encode64(iv),
            tag: forge.util.encode64(salt)
        }
    }
    decrypt(text, password, ivStr, saltStr) {
        const salt = forge.util.decode64(saltStr)
        const iv = forge.util.decode64(ivStr)
        const key = forge.pkcs5.pbkdf2(password, salt, 40, 16)
        const decipher = forge.cipher.createDecipher(this._mode, key)
        decipher.start({iv: iv})
        decipher.update(forge.util.createBuffer(forge.util.decode64(text)))
        decipher.finish()
        const decipheredText = decipher.output.toString()
        return decipheredText
    }
}
export default new Encryption()