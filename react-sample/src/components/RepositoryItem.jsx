import React from "react"

export function RepositoryItem(props) {
    console.log(props.repo?.link)
    return (
        <li>
            <strong>{props.repo?.name ?? "S/N"}</strong>
            <p>{props.repo?.description}</p>
            <a href="{props.repo?.link}">Acessar</a>
        </li>
    )
}