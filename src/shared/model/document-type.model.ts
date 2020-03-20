export class DocumentType {
    constructor(public value: EnumTypeValue, public label: String) { }
}

export enum EnumTypeValue {
    FichePaie,
    Contrat,
    Cv,
    Lettre,
    Autre
};