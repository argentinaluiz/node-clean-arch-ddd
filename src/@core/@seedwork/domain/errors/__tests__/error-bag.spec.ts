import ErrorBag from '../error-bag';

describe('ErrorBag Unit Tests', () => {
    let errorBag: ErrorBag;

    beforeEach(() => errorBag = new ErrorBag())
    it('should add an error', () => {
        errorBag.add('error test');
        expect(errorBag.errors).toStrictEqual(['error test'])

        errorBag.add({field: ['new error']});
        expect(errorBag.errors).toStrictEqual([
            'error test',
            {field: ['new error']}
        ])
    });

    test('hasError method', () => {
        expect(errorBag.hasError()).toBeFalsy();

        errorBag.add('error test');

        expect(errorBag.hasError()).toBeTruthy();
    });

    test('notHasError method', () => {
        expect(errorBag.notHasError()).toBeTruthy();

        errorBag.add('error test');

        expect(errorBag.notHasError()).toBeFalsy();
    })
})