import prisma from "./lib/prisma.js";

const deleteAllUsers = async()=>{
  try {
    console.log("Start deleting all users...");

    // Related to User
    await prisma.message.deleteMany({});
        console.log('messages[deleted] ✔✔✔✔✔✔')

    await prisma.participant.deleteMany({});
        console.log('participants[deleted] ✔✔✔✔✔✔')

    await prisma.savedPosts.deleteMany({});
        console.log('saved posts[deleted] ✔✔✔✔✔✔')

    // Posts and details owned by user
    await prisma.postDetail.deleteMany({});
        console.log('postDetail[deleted] ✔✔✔✔✔✔')

    await prisma.post.deleteMany({});
        console.log('allPosts[deleted] ✔✔✔✔✔✔')
    

    // Chats (after participants and messages are gone)
    await prisma.chat.deleteMany({});
        console.log('all chats[deleted] ✔✔✔✔✔✔')


    // Finally users
    await prisma.user.deleteMany({});

    console.log("End deleting users.");
    console.log("✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔")
  } catch (error) {
    console.log(`Failed to delete users: ${error.message}`);
  }
};


const deleteAllPosts = async()=>{
    try {
        console.log('start deleting all Posts')
        await prisma.savedPosts.deleteMany({})
        console.log('saved Posts[deleted] ✔✔✔✔✔✔')
        await prisma.postDetail.deleteMany({})
        console.log('postDetail[deleted] ✔✔✔✔✔✔')
        await prisma.post.deleteMany({})
        console.log('end deleting posts')
        console.log("✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔")


    } catch (error) {
        console.log(`failed to delete posts ${error.message}`)
    }
}

const getAllUsers = async()=>{
    try {
        
        const users = await prisma.user.findMany({
            include:{
                posts:true,
                savedPosts:true,
            }
        })
        console.log("✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔")
        console.log(users)

    } catch (error) {
        console.log(`failed to get all users ${error.message}`)
        
    }
}

const getAllPosts = async()=>{
    try {
        
        const posts = await prisma.post.findMany({
            include:{
                postDetail:true,
                user:{
                    select:{
                        username:true
                    }
                },
            }
        })
        console.log("✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔")
        console.log(users)
        
    } catch (error) {
        console.log(`failed to get all users ${error.message}`)
        
    }
}


// deleteAllUsers()
// deleteAllPosts()