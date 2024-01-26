import styles from '@/styles/Home.module.css';

export default function Home() {
  

  return(
    <>    </>
  )
}
export async function getServerSideProps(){

  return{
      redirect:{
      destination:"/auth/signup",
      permanent:false,
  }
  };
};