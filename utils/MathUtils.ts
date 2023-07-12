export class MathUtils {
    public Ip(a: number[], b: number[]): number {
        return 1 - this.Dot(a, b);
    }

    public Dot(a: number[], b: number[]): number {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }

    public Norm(vec: number[]): number {
        return Math.sqrt(this.Norm2(vec));
    }

    public Norm2(vec: number[]): number {
        let sum = 0;
        for (let i = 0; i < vec.length; i++) {
            sum += vec[i] * vec[i];
        }
        return sum;
    }

    public cosine(a: number[], b: number[]): number {
        return this.Ip(a, b) / (this.Norm(a) * this.Norm(b));
    }
}