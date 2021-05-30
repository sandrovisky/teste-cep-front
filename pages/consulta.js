import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Search from "@material-ui/icons/Search";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";


import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";

import image from "assets/img/bg7.jpg";
//import api from "../services/api";
import apiCEP from "../services/apiCEP";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [loading, setloading] = useState(false)
    const [cep, setCEP] = useState('')    
    const [dados, setDados] = useState('')
    
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    async function buscarCep(e) {
        e.preventDefault()
        await apiCEP.get(`/${cep}/json`)
        .then(res => {
            setDados(res.data) 
        })
        .catch(() => {
            alert("Nenhum cadastro encontrado para esse CEP")
        })
    }

    return (
        <>
        <div style = {{cursor: `${loading ? "progress": "auto"}`}}>
            
        <Header
            absolute
            brandComponent = "oxe"
            rightLinks={<HeaderLinks />}
            {...rest}
        />
        <div
            className={classes.pageHeader}
            style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
            }}
        >
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={10} md={8} >
                        <Card className={classes[cardAnimaton]}>
                            <form className={classes.form} onSubmit = {e => buscarCep(e)} >
                            <CardHeader color="primary" className={classes.cardHeader}>
                                <h3>CONSULTAR CEP</h3>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="CEP"
                                    id="nome"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        value: cep,                        
                                        required: true,
                                        maxLength: "2",
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <Search className={classes.inputIconsColor} />
                                        </InputAdornment>
                                        ),
                                        onChange: e => setCEP(e.target.value)
                                    }}
                                />
                                {
                                    dados &&
                                    <div>
                                        UF: {dados.uf}  Cidade: {dados.localidade} <br />
                                        Bairro: {dados.bairro} <br />
                                        Rua: {dados.logradouro} <br />
                                        Complemento: {dados.complemento} <br />
                                    </div>
                                }
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button simple color="primary" type = "submit" size="lg">
                                Cadastrar
                                </Button>
                            </CardFooter>
                            </form>
                        </Card>
                    </GridItem>
                    
                </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
        </div>
        </>
    );
}
