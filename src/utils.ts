import blobshape from 'blobshape';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

// Note: this only works on the server side
export function getNetlifyContext() {
    return process.env.CONTEXT;
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function uniqueName() {
    const config = {
        dictionaries: [adjectives, animals],
        separator: '-',
        length: 2
    };
    return uniqueNamesGenerator(config) + '-' + randomInt(100, 999);
}

export function generateBlob(parameters?: any) {
    const gradientColors = [
        ['#2E3192', '#1BFFFF'],
        ['#93A5CF', '#E4EfE9'],
        ['#BFF098', '#6FD6FF'],
        ['#A1C4FD', '#C2E9FB'],
        ['#11998E', '#38EF7D'],
        ['#D8B5FF', '#1EAE98']
    ];

    parameters = {
        seed: null,
        size: 512,
        edges: randomInt(3, 20),
        growth: randomInt(2, 9),
        name: uniqueName(),
        colors: gradientColors[randomInt(0, gradientColors.length - 1)],
        ...parameters
    };
    const { path: svgPath, seedValue: seed } = blobshape(parameters);
    return { parameters: { ...parameters, seed }, svgPath };
}
