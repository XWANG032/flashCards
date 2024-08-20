'use client'
import { SignedIn, useUser, SignedOut, UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, CollectionReference, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
//import { Router } from "next/router"
import {useRouter} from 'next/navigation' 
import Link from 'next/link';
import { Box, AppBar, Toolbar, Button, Card, Grid, CardActionArea, CardContent, Container, Typography } from "@mui/material"

export default function Flashcards(){
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards(){
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            }
            else{
                await setDoc(docRef, {flashcards: []})
            }
        }

        getFlashcards()
}, [user])

    if (!isLoaded || !isSignedIn){
        return <></>
    }

    const handleCardClick = (id) => {
        router.push('/flashcard?id=' + id)
    }

    return(
    <>
    <Box>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
            <Box sx={{display: 'flex',paddingLeft: '10px', paddingRight: '10px'}}>
                <Link href = "/">
                <Button sx = {{
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover':{
                            transform : 'scale(1.15)'
                        }
                    }}>
                        Home
                    </Button>
                </Link> 
                <Link href = "/generate">
                    <Button sx = {{
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover':{
                            transform : 'scale(1.15)'
                        }
                    }}>
                            Generate
                    </Button>
                </Link>
                <Link href = "/flashcards">
                <Button sx = {{
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover':{
                            transform : 'scale(1.15)'
                        }
                    }}>
                        Flashcards
                    </Button>
                </Link>
            </Box>
            <SignedOut>
              <Button color="inherit" href='sign-in'>Login</Button>
              <Button color="inherit" href='sign-up'>Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
    </Box>
    <Container maxwidth = "100vw">
        <Grid container spacing = {3} sx = {{
            mt: 4
        }}>
            {flashcards.map((flashcard, index) => (
                <Grid item xs = {12} sm = {6} md = {4} key = {index}>
                    <Card>
                        <CardActionArea onClick={() => {
                            handleCardClick(flashcard.name)
                        }}>
                            <CardContent>
                                <Typography variant = 'h6'>
                                    {flashcard.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
    </>
    )
}