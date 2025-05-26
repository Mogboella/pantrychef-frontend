"use client";

import Image from 'next/image'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimation,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableItem } from '@/components/SortableItem';

// Pantry item type
interface PantryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    expiry?: string;
}

// Category type
interface Category {
    id: string;
    name: string;
    color: string;
}

export default function PantryPage() {

    const initialCategories: Category[] = [
        { id: 'grains', name: 'Grains', color: 'bg-yellow-100' },
        { id: 'veggies', name: 'Veggies', color: 'bg-green-100' },
        { id: 'proteins', name: 'Proteins', color: 'bg-red-100' },
        { id: 'dairy', name: 'Dairy', color: 'bg-blue-100' },
        { id: 'spices', name: 'Spices', color: 'bg-purple-100' },
    ];

    const initialItems: PantryItem[] = [
        { id: '1', name: 'Rice', category: 'grains', quantity: 3, expiry: '2023-12-15' },
        { id: '2', name: 'Pasta', category: 'grains', quantity: 2, expiry: '2023-12-20' },
        { id: '3', name: 'Carrots', category: 'veggies', quantity: 5, expiry: '2023-12-10' },
        { id: '4', name: 'Chicken', category: 'proteins', quantity: 1, expiry: '2023-12-05' },
        { id: '5', name: 'Milk', category: 'dairy', quantity: 2, expiry: '2023-12-08' },
    ];

    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialItems);
    const [groceryList, setGroceryList] = useState<string[]>([]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItem, setNewItem] = useState<PantryItem>({
        id: '', // Optional initial value
        name: '',
        category: 'grains',
        quantity: 1,
        expiry: '',
    });
    const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
    const [activeTab, setActiveTab] = useState<'pantry' | 'grocery'>('pantry');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draggedItem, setDraggedItem] = useState<PantryItem | null>(null);


    // Initialize sensors for dnd-kit
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Load from localStorage if available
    useEffect(() => {
        const savedPantry = localStorage.getItem('pantryItems');
        if (savedPantry) setPantryItems(JSON.parse(savedPantry));

        const savedGrocery = localStorage.getItem('groceryList');
        if (savedGrocery) setGroceryList(JSON.parse(savedGrocery));

    }, []);

    // Save to localStorage when changes occur
    useEffect(() => {
        localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
    }, [pantryItems, groceryList]);

    const handleAddItem = () => {
        if (!newItem.name) return;

        const item: PantryItem = {
            ...newItem,
            id: Date.now().toString(),
            expiry: newItem.expiry || '2023-12-31',
        };

        setPantryItems([...pantryItems, item]);
        setNewItem({ id: '', name: '', category: 'grains', quantity: 1, expiry: '' });
        setCategories([])
        setIsAddingItem(false);
    };

    const handleEditItem = () => {
        if (!editingItem || !editingItem.name || !editingItem.id) return;

        setPantryItems(prev =>
            prev.map(item => (item.id === editingItem.id ? editingItem : item))
        );
        setEditingItem(null);
    };


    const handleDeleteItem = (id: string) => {
        setPantryItems(pantryItems.filter(item => item.id !== id));
    };

    const addToGroceryList = (name: string) => {
        if (!groceryList.includes(name)) {
            setGroceryList([...groceryList, name]);
        }
    };

    const removeFromGroceryList = (index: number) => {
        setGroceryList(groceryList.filter((_, i) => i !== index));
    };

    const generateRecipes = () => {
        alert(`Generating recipes with: ${pantryItems.map(i => i.name).join(', ')}`);
    };

    const getStatus = (item: PantryItem): 'low' | 'expiring' | 'soon' | 'good' => {
        const today = new Date();
        const expiryDate = new Date(item.expiry || '');
        const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (item.quantity <= 1) return 'low';
        if (diffDays <= 3) return 'expiring';
        if (diffDays <= 7) return 'soon';
        return 'good';
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id.toString());

        console.log(activeId)

        if (activeTab === 'pantry') {
            const item = pantryItems.find(i => i.id === active.id);
            if (item) setDraggedItem(item);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            setDraggedItem(null);
            return;
        }

        if (activeTab === 'pantry' && active.id !== over.id) {
            const oldIndex = pantryItems.findIndex(item => item.id === active.id);
            const newIndex = pantryItems.findIndex(item => item.id === over.id);

            setPantryItems(arrayMove(pantryItems, oldIndex, newIndex));
        }

        setActiveId(null);
        setDraggedItem(null);
    };

    const handleDragCancel = () => {
        setActiveId(null);
        setDraggedItem(null);
    };

    const dropAnimation = {
        ...defaultDropAnimation,
        dragSourceOpacity: 0.5,
    };

    return (
        <div className="min-h-screen bg-orange-50 p-6 rounded-lg text-black">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-orange-800 flex items-center gap-1">
                    <span className="inline-flex items-center">
                        Pantry
                        {/* <Image src="/PC.png" alt="Pantry" className="ml-2 h-14 w-14" /> */}
                    </span>
                </h1>
                <p className="text-orange-600">Manage your ingredients and plan meals</p>
            </header>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('pantry')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'pantry' ? 'bg-orange-500 text-white' : 'bg-orange-200'}`}
                >
                    My Pantry
                </button>
                <button
                    onClick={() => setActiveTab('grocery')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'grocery' ? 'bg-orange-500 text-white' : 'bg-orange-200'}`}
                >
                    Grocery List ({groceryList.length})
                </button>
                <button
                    onClick={generateRecipes}
                    className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Generate Recipes
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                modifiers={[restrictToVerticalAxis]}
            >
                {activeTab === 'pantry' ? (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-orange-700">Pantry Items</h2>
                            <button
                                onClick={() => setIsAddingItem(true)}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
                            >
                                <span>+</span> Add Item
                            </button>
                        </div>

                        <AnimatePresence>
                            {isAddingItem && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mb-6 p-4 bg-white rounded-lg shadow-md"
                                >
                                    <h3 className="text-lg font-medium mb-3">Add New Item</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Item name"
                                            className="p-2 border rounded"
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        />
                                        <select
                                            className="p-2 border rounded"
                                            value={newItem.category}
                                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            className="p-2 border rounded"
                                            value={newItem.quantity}
                                            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                                            min="1"
                                        />
                                        <input
                                            type="date"
                                            className="p-2 border rounded"
                                            value={newItem.expiry}
                                            onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-3">
                                        <button
                                            onClick={() => setIsAddingItem(false)}
                                            className="px-3 py-1 bg-gray-200 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddItem}
                                            className="px-3 py-1 bg-orange-500 text-white rounded"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {editingItem && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mb-6 p-4 bg-white rounded-lg shadow-md"
                                >
                                    <h3 className="text-lg font-medium mb-3">Edit Item</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Item name"
                                            className="p-2 border rounded"
                                            value={editingItem.name}
                                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                        />
                                        <select
                                            className="p-2 border rounded"
                                            value={editingItem.category}
                                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            className="p-2 border rounded"
                                            value={editingItem.quantity}
                                            onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 0 })}
                                            min="1"
                                        />
                                        <input
                                            type="date"
                                            className="p-2 border rounded"
                                            value={editingItem.expiry}
                                            onChange={(e) => setEditingItem({ ...editingItem, expiry: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-3">
                                        <button
                                            onClick={() => setEditingItem(null)}
                                            className="px-3 py-1 bg-gray-200 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleEditItem}
                                            className="px-3 py-1 bg-orange-500 text-white rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {pantryItems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 bg-white rounded-lg shadow-sm"
                            >
                                <p className="text-2xl text-orange-400">Your pantry is hungry 🍽️</p>
                                <p className="text-orange-300 mt-2">Add some items to get started!</p>
                                <button
                                    onClick={() => setIsAddingItem(true)}
                                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                                >
                                    Add First Item
                                </button>
                            </motion.div>
                        ) : (
                            <SortableContext
                                items={pantryItems.map(item => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {pantryItems.map((item) => {
                                        const category = categories.find(c => c.id === item.category);
                                        const status = getStatus(item);

                                        return (
                                            <SortableItem key={item.id} id={item.id}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    whileHover={{ y: -2 }}
                                                    className={`p-4 rounded-lg shadow-md ${category?.color || 'bg-gray-100'} relative overflow-hidden`}
                                                >
                                                    <div className={`absolute top-0 left-0 w-1 h-full ${status === 'low' ? 'bg-red-500' :
                                                        status === 'expiring' ? 'bg-purple-500' :
                                                            status === 'soon' ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}></div>

                                                    <div className="ml-3">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-medium text-lg">{item.name}</h3>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => setEditingItem({ ...item })}
                                                                    className="text-orange-600 hover:text-orange-800"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteItem(item.id)}
                                                                    className="text-red-600 hover:text-red-800"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 text-sm text-gray-700">
                                                            <p>Category: {category?.name || 'Uncategorized'}</p>
                                                            <p>Quantity: {item.quantity}</p>
                                                            <p>Expiry: {item.expiry ? new Date(item.expiry).toLocaleDateString() : 'N/A'}</p>
                                                        </div>

                                                        <div className="mt-3 flex justify-between items-center">
                                                            <span className={`text-xs px-2 py-1 rounded-full ${status === 'low' ? 'bg-red-100 text-red-800' :
                                                                status === 'expiring' ? 'bg-purple-100 text-purple-800' :
                                                                    status === 'soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                {status === 'low' ? 'Low stock' :
                                                                    status === 'expiring' ? 'Expiring soon!' :
                                                                        status === 'soon' ? 'Expiring in a week' : 'In stock'}
                                                            </span>

                                                            <button
                                                                onClick={() => addToGroceryList(item.name)}
                                                                className="text-sm bg-white bg-opacity-70 px-2 py-1 rounded hover:bg-opacity-90 transition"
                                                            >
                                                                Add to Grocery
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </SortableItem>
                                        );
                                    })}
                                </div>
                            </SortableContext>
                        )}

                        <DragOverlay dropAnimation={dropAnimation}>
                            {draggedItem ? (
                                <div className={`p-4 rounded-lg shadow-lg ${categories.find(c => c.id === draggedItem.category)?.color || 'bg-gray-100'} w-64`}>
                                    <div className="ml-3">
                                        <h3 className="font-medium text-lg">{draggedItem.name}</h3>
                                        <div className="mt-1 text-sm text-gray-700">
                                            <p>Quantity: {draggedItem.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </DragOverlay>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Grocery List</h2>

                        {groceryList.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <p className="text-2xl text-orange-400">No items in your grocery list yet</p>
                                <p className="text-orange-300 mt-2">Add items manually or from your pantry</p>
                            </motion.div>
                        ) : (
                            <ul className="space-y-2">
                                {groceryList.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="p-3 bg-orange-50 rounded-lg flex justify-between items-center"
                                    >
                                        <span className="font-medium">{item}</span>
                                        <button
                                            onClick={() => removeFromGroceryList(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add new grocery item"
                                    className="flex-1 p-2 border rounded"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.value) {
                                            addToGroceryList(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        const input = document.querySelector('input[placeholder="Add new grocery item"]');
                                        if (input.value) {
                                            addToGroceryList(input.value);
                                            input.value = '';
                                        }
                                    }}
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </DndContext>
        </div>
    );
};
