import { Button, Text } from '@/components/base'
import { Container } from '@/components/inc'
import { signInWithGoogle } from '@/services/firebase/auth'

const Welcome = () => {

  const handleGoogleClick = async () => {
    signInWithGoogle()
  }

  return (
    <Container className='absolute top-0 left-0 w-full h-screen bg-background flex items-center'>
      <div className='w-1/2'></div>
      <div className='flex flex-col gap-8'>
        <Text className='text-6xl font-extrabold'>A X (twitter) clone</Text>
        <Text className='font-bold text-3xl mt-4'>Join today.</Text>
        <div className='flex flex-col w-1/2 gap-3'>
          <Button variant="light" pill onClick={handleGoogleClick}>Sign up with Google</Button>
          {/** <Button variant="light" pill>Sign up with Apple</Button> **/}
        </div>
      </div>
    </Container>
  )
}

export default Welcome