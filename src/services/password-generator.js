import Generator from 'generate-password'

export default function generate() {
    const  password = Generator.generate({
        length: 32,
        numbers: true,
        strict: true, 
        symbols: true,
        excludeSimilarCharacters: true
    });
    return password
}