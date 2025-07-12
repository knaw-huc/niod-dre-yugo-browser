import {useNavigate} from "react-router-dom";

export function goExternal(url: string) {
    window.open(url);
}

export function fullPerson(name: string | undefined, birthYear: string | null | undefined, deathYear: string | null | undefined) {
    const bj: boolean = birthYear !== "" && birthYear !== null;
    const dj: boolean = deathYear !== "" && deathYear !== null;
    if (bj && dj) {
        return name + " ( " + birthYear + " - " + deathYear + " )";
    } else {
        if (bj) {
            return name + " ( " + birthYear + " -  )";
        } else {
            if (dj) {
                return name + " (  - " + deathYear + " )";
            } else {
                return name;
            }
        }
    }
}


export function fd(str: string | undefined) {
    let elements = [];
    if (str !== undefined) {
        elements = str.split('-');
        if (elements.length === 3) {
            return elements[2] + "-" + elements[1] + "-" + elements[0];
        } else {
            return str;
        }
    } else {
        return str;
    }
}

export function get_gender(str: string) {
    switch(str) {
        case 'M':
            return "Male";
        case "F":
            return "Female";
        default:
            return "Unknown";
    }
}

export function get_entity(str: string) {
    switch(str) {
        case 'Y':
            return "Organisation";
        case "N":
            return "Person";
        default:
            return "Unknown";
    }
}