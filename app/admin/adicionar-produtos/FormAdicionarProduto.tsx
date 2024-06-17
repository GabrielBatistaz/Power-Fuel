"use client";

import Botao from "@/app/components/botao";
import AreaTexto from "@/app/components/inputs/Areatexto";
import CategoriaInput from "@/app/components/inputs/CategoriaInput";
import CheckEstoque from "@/app/components/inputs/CheckEstoque";
import SelecionarCor from "@/app/components/inputs/SelecionarCor";
import Input from "@/app/components/inputs/input";
import Titulo from "@/app/components/titulo";
import firebaseApp from "@/bibliotecas/firebase";
import { categorias } from "@/utils/Categorias";
import { Cores } from "@/utils/Cores";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImagemType = {
    cor: string;
    codigocor: string;
    image: File | null;
};
export type UploadedImagemType = {
    cor: string;
    codigocor: string;
    image: string;
};


const FormAdicionarProduto = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const [images, setImages] = useState<ImagemType[] | null>();
    const [isProdutoCriado, setisProdutoCriado] = useState(false);


    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            nome: "",
            descricao: "",
            marca: "",
            categoria: "",
            inEstoque: false,
            images: [],
            preco: "",
        },
    });

    useEffect(() => {
        setCustomValue('images', images);
    }, [images]);

    useEffect(() => {
        if (isProdutoCriado) {
            reset();
            setImages(null);
            setisProdutoCriado(false);
        }

    }, [isProdutoCriado]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Product Data", data);

        setisLoading(true)
        let uploadedImages: UploadedImagemType[] = []

        if (!data.categoria) {
            setisLoading(false);
            return toast.error("Selecione uma categoria!");
        }
        if (!data.images || data.images.lenght === 0) {
            setisLoading(false);
            return toast.error("Selecione uma imagem!");
        }
        const handleImagemUploads = async () => {
            toast("Criando Produto...");
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + "-" + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                (error) => {
                                    console.log("Erro no Upload da imagem", error);
                                    reject(error);
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({...item, image: downloadURL,});
                                        console.log('File available at', downloadURL);
                                        resolve();
                                    }
                                ).catch((error) =>{
                                    console.log("Erro ao pegar o download URL", error);
                                    reject(error);
                                });
                                }
                            );
                        });

                    }
                }
            } catch (error) {
                setisLoading(false);
                console.log("Erro no tratamento de carregamento de imagem", error);
                return toast.error("Erro no tratamento de carregamento de imagem");
            }
        };

        await handleImagemUploads();
        const Dataproduct = {...data, images:uploadedImages};

        axios.post("/api/product",Dataproduct).then(() =>{
            toast.success("Produto Criado");
            setisLoading(true);
            router.refresh();
        }).catch((error) => {
            toast.error("Erro ao salvar produto ao banco de dados");
        }).finally(() => {
            setisLoading(false);
        });

    };

    const categoria = watch('categoria');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const addImagemToState = useCallback((value: ImagemType) => {
        setImages((prev) => {
            if (!prev) {
                return [value];
            }
            return [...prev, value];
        });
    }, []);

    const removerImagemFromState = useCallback((value: ImagemType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter(
                    (item) => item.cor != value.cor
                );
                return filteredImages;
            }
            return prev;
        });
    }, []);

    return (
        <>
            <Titulo title="Adicionar Produto" center />
            <Input id="nome" label="Nome" disabled={isLoading} register={register} erros={errors} required />
            <Input id="preco" label="Preço" disabled={isLoading} register={register} erros={errors} type="number" required />
            <Input id="marca" label="Marca" disabled={isLoading} register={register} erros={errors} required />
            <AreaTexto id="descricao" label="Descrição" disabled={isLoading} register={register} erros={errors} required />

            <CheckEstoque id="inEstoque" register={register} label="Esse produto está no estoque" />
            <div className="w-full font-medium">
                <div className="mb-2 font-bold">Selecionar uma Categoria</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
                    {categorias.map((item) => {
                        if (item.label === "Todos") {
                            return null;
                        }
                        return (
                            <div key={item.label} className="col-span">
                                <CategoriaInput onClick={(categoria) => setCustomValue('categoria', categoria)}
                                    selected={categoria === item.label}
                                    label={item.label}
                                    icon={item.icon}

                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className="font-semibold">
                        Selecione as cores disponíveis para o produto e envie fotos.
                    </div>
                    <div className="text-sm">
                        Caso não faça upload de uma imagem para cada uma das cores escolhidas, sua seleção de cores será ignorada.
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {Cores.map((item, index) => {
                        return (
                            <SelecionarCor
                                key={index}
                                item={item}
                                addImagemToState={addImagemToState}
                                removerImagemFromState={removerImagemFromState}
                                isProdutoCriado={isProdutoCriado} />
                        );
                    })}
                </div>
            </div>
            <Botao label={isLoading ? "Carregando..." : "Adicionar Produto"} onClick={handleSubmit(onSubmit)} />
        </>
    );
};

export default FormAdicionarProduto;