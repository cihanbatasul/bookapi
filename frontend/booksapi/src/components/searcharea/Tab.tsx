import { Tab as TabUI } from "@headlessui/react"
import { FC, useState } from "react"

interface props {
  onOrder: (input: string) => void
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const Tab: FC<props> = ({...props}) => {

  let [categories] = useState({
    Newest: [
      {
        name: "newest"
      },
    ],
    Relevance: [
      {
        name: "relevance"
      }
    ]
  })


  return (
    
    <div className="w-full max-w-md px-2 py-16 sm:px-0 mx-auto">
      <TabUI.Group>
        <TabUI.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <TabUI
              key={category}
              onClick={() => props.onOrder(category.toLowerCase())}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </TabUI>
          ))}
        </TabUI.List>
        
      </TabUI.Group>
    </div>


  )
}

export default Tab