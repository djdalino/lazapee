import { z } from 'zod'
import { StandardResponse } from '@/app/Helpers/Responses'
import { createProduct } from '@/app/Helpers/Products'

const schema = z.object({
  productId: z.string(),
})

export default async function addToCart(
  prevState: any,
  formData: FormData
): Promise<StandardResponse> {
  try {
    const newProduct = {
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string),
      image: formData.get('image') as string,
      description: formData.get('description') as string,
    }

    console.log({newProduct})

    const validatedFields = schema.safeParse(newProduct)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // Directus: Product Create
    await createProduct(newProduct)

    return { success: true }
  } catch (e) {
    return { success: false }
  }
}
