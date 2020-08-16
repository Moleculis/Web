import React from "react";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";

interface TextLinkProps{
    to:string,
    text:string
}

const TextLink = ({to, text}: TextLinkProps) => {
    return (
        <>
            <Link variant="body2" component={RouterLink} to={to}>
                {text}
            </Link>
        </>
    );
};

export default TextLink;