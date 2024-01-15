import { Service } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { serviceSearchableFields } from "./service.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";

const createService = async (data: Service) => {

    const result = await prisma.service.create({ data });
    return result;
}


const getAllService = async (filters: any, options: any) => {
    const { searchTerm, category }: any = filters;

    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options)

    const andConditions: any[] = [];
    const orConditions: any[] = [];

    // if (Object.keys(filterData)?.length > 0) {
    //     Object.keys(filterData)?.map(key => {
    //         andConditions.push({
    //             [key]: filterData[key]
    //         })
    //     })
    // }


    if (category) {
        andConditions.push({
            category: {
                title: category
            }
        })
    }
    if (searchTerm?.length) {
        serviceSearchableFields?.map(key => {
            orConditions.push({
                [key]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })
        })
    }


    const whereConditions: any = {};
    if (andConditions?.length > 0) whereConditions['AND'] = andConditions
    if (orConditions?.length > 0) whereConditions['OR'] = orConditions

    const result = await prisma.service.findMany({
        where: whereConditions,
        include: {
            booking: {
                select: {
                    id: true
                }
            },
            category: true
        },
        skip,
        take: limit,
    });


    const highestPrice = await prisma.service.findFirst({
        where: whereConditions,
        select: {
            price: true
        },
        orderBy: {
            price: 'desc'
        }
    })
    const lowestPrice = await prisma.service.findFirst({
        where: whereConditions,
        select: {
            price: true
        },
        orderBy: {
            price: 'asc'
        }
    })

    return { result, highestPrice, lowestPrice };
};



const getServiceDetails = async (id: string) => {
    const result = await prisma.service.findFirst({
        where: {
            id,
        },
        include: {
            schedule: {
                include: {
                    booking: true
                }
            },
            review: {
                include: {
                    user: {
                        select: {
                            fullName: true,
                            email: true
                        }
                    }
                }
            },
            category: true,
            booking: true
        }
    });
    return result;
};

const updateService = async (id: string, data: any) => {

    const result = await prisma.service.update({
        where: {
            id,
        },
        data
    });

    return result;
};
const getServiceForAddReview = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            AND: [
                { userId },
                { status: 'DELIVERED' },
                {
                    NOT: {
                        service: {
                            review: {
                                some: {
                                    userId
                                }
                            }
                        }
                    }
                }
            ]
        },
        select: {
            serviceId: true,
            status: true,
            service: true,
            createdAt: true
        }
    });

    return result;


};


const deleteService = async (id: string) => {
    const result = await prisma.service.delete({
        where: {
            id,
        },
    });
    return result;
};

const makeComment = async (data: any) => {
    const result = await prisma.comment.create({
        data: data
    })
    return result;
}
const getServiceComments = async (serviceId: string) => {
    const result = await prisma.comment.findMany({
        where: {
            serviceId
        },
        include: {
            user: {
                select: {
                    fullName: true
                }
            },
            replies: {
                select: {
                    createdAt: true,
                    reply: true,
                    user: {
                        select: {
                            fullName: true
                        }
                    }
                }
            }
        }
    })
    return result;
}

const makeReply = async (data: any) => {
    const result = await prisma.reply.create({
        data: data
    })
    return result;
}

export const ServiceService = {
    createService,
    getAllService,
    getServiceDetails,
    updateService,
    deleteService,
    getServiceForAddReview,
    makeComment,
    getServiceComments,
    makeReply
}