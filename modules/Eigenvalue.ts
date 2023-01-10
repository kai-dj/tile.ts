import { Prototile, PrototileReplacement } from "../modules/Prototile"
import { sqrt } from 'mathjs'
export function calculateEigenvalue(prototiles: Prototile[]): number {
    prototiles.forEach(prototile => {
        let indexPrototile = prototiles.indexOf(prototile)
        console.log("prototile" + prototiles.indexOf(prototile))
        let replacementString: String = "RPS-"
        prototile.replacements.forEach(replacement => {
            replacementString += replacement.prototypeNumber.toString() + "--"
        })
        console.log(replacementString);
        console.log("counts");
        let matrixColumnString: String = "MCS-"
        for (let indexReplacement = 0; indexReplacement < prototiles.length; indexReplacement++) {
            console.error(
             prototile.replacements.filter(replacement => {
                replacement.prototypeNumber == indexReplacement
            }).length+"---LLL");
            matrixColumnString += prototile.replacements.filter(replacement => {
                console.log(replacement.prototypeNumber + "!N " + indexReplacement + "!I ");
                replacement.prototypeNumber.toString().trim() == indexReplacement.toString().trim()
            }).length + "-"

        }
        console.log(matrixColumnString);

    })
    return 0
}