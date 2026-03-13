import { Review } from "./Review";

export class Sitter {
  constructor(
    public email: string,
    public name: string,
    public reviews: Review[]
  ) {}
}
