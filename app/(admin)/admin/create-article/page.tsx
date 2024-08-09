import CreateArticle from '@/components/CreateArticle'
import React from 'react'

type Props = {}

const CreateArticlePage = (props: Props) => {
  return (
    <div className="flex-1 md:flex-[0.8]">
        <CreateArticle />
    </div>
  )
}

export default CreateArticlePage