export class Snippet {

    id: string | null;
    content: string[];

    constructor(  id: string  | null = null, content: string[] = []) {
        this.id = id,
        this.content = content;
    }
}
