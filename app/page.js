'use client'
import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import {AppBar, Button, Container, Toolbar, Typography, Box, Grid} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const handleSubmitPro = async() => {
    const checkoutSession = await fetch ('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        nameOfSubscription: 'Pro Subscription',
        cost: 10
      },
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if(error){
      console.warn(error.message)
    }
  }
  const handleSubmitBasic = async() => {
    const checkoutSession = await fetch ('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        nameOfSubscription: 'Basic Subscription',
        cost: 5
      },
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if(error){
      console.warn(error.message)
    }
  }
  return (
    <>
    <Box>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
            <Box sx={{display: 'flex'}}>
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
            </Box>
            <SignedOut>
              <Button color="inherit" href='sign-in'>Login</Button>
              <Button color="inherit" href='sign-up'>Sign Up</Button>
            </SignedOut>
            <SignedIn>
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
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
    </Box>
    <Container>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name = "description" content="Create flashcard from your text"></meta>
      </Head>
      
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" sx={{fontWeight: 'bold' , color:'#D2042D'}}gutterBottom>Flashcard SaaS</Typography>
        <Typography variant="h4" color='#D2042D' gutterBottom>The most convenient way to create flashcards!</Typography>
        <Button variant="contained" color="primary" sx = {{mt: 2, mr: 4, bgcolor: 'skyblue', color:'black'}} href='generate'>Get Started</Button>
        <Button variant="contained" color="secondary" sx = {{mt: 2, ml: 4, bgcolor: 'violet', color: 'black'}} href='flashcards'>Flashcards</Button>
      </Box>
      <Box sx = {{my: 6}}>
        <Typography variant="h4" textAlign='center' gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
                {' '}
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
                {' '}
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
                {' '}
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx = {{
              p: 3,
              border: "2px solid blue",
              boxShadow: 5,
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>              
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant = 'contained' color = 'primary' sx = {{mt: 2}} onClick={handleSubmitBasic}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx = {{
              p: 3,
              border: "2px solid blue",
              boxShadow: 5,
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant = 'contained' color = 'primary' sx = {{mt: 2}} onClick={handleSubmitPro}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  )
}
