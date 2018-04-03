import Generator from 'generate-password'

export default function generate() {
    const  password = Generator.generate({
        length: 60,
        numbers: true,
        strict: true, 
        symbols: true,
        excludeSimilarCharacters: false
    });
    return password
}