import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/users.utils";

const resolverFn = async (_, { id, name, latitude, longitude, categories}, { loggedInUser,client }) => {
    console.log("editCoffeeShop start");
    let categoryObjs = [];
    if (categories) {
        categories.forEach(category => {
        const slug = category.replace(" ", "_");
        categoryObjs.push({
            where: { name:category },
            create: { name:category, slug:slug },
        });
        })
    };
    const shop = await client.coffeeShop.findFirst({
        where: { id, userId: loggedInUser.id, },
        include: {
            categories: {
                select: {
                    slug:true
                },
            },
        },
    });
    if (!shop) {
        console.log("Cannot edit not yours.");
        console.log("editCoffeeShop End");
        return {
            ok: false,
            error: "Cannot edit not yours."
        }
    }

    const updatedCoffeeShop = await client.coffeeShop.update({
        where: 
        {
            id: shop.id,
        },
        data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: shop.categories,
              connectOrCreate: categoryObjs,
            },
        }
    });
    if (updatedCoffeeShop.id) {
        return {
            ok: true,
        };
    } else {
        return {
            ok: false,
            error: "Could not update updatedCoffeeShop.",
        };
    }
};
const resolvers: Resolvers = {
    Mutation: {
        editCoffeeShop: protectedResolver(resolverFn),
    },
};
export default resolvers;