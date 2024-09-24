"use client";

import React, { useTransition } from 'react'
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from 'sonner';
import { deleteUser } from "./_actions";

interface ActionButtonsProps {
    id : number,
}

export const ActionButtons = ({ id } : ActionButtonsProps) => {
    const [isPending, startTransition] = useTransition();
    
    const handleDelete = async () => {
        startTransition(() => {
            const deleteUserAsync = async () => {
                try {
                    const result = await deleteUser(id);

                    toast.success(result.message, {
                        position: "top-right",
                        style: {
                            backgroundColor: '#D1FFBD',
                            color: '#000',
                            fontWeight: 'bold',
                        },
                    });
                } catch (error) {
                    console.error("Error: ",error);
                }
            }
            deleteUserAsync();
            console.log("delete", id)
        })
    }


    return (
        <div>
            {/* <button>Add</button> */}
            {/* <button>Edit</button> */}
            <Button variant="destructive" onClick={() => handleDelete()} disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 />}
            </Button>
        </div>
    )
}