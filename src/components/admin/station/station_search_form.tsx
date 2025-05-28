import { useState } from 'react';
import type { GetStationListQueryDTO } from '../../../models/dto/station_dto';

/**
 * # 站点搜索表单组件属性接口
 */
interface StationSearchFormProps {
    /** 搜索回调函数 */
    onSearch: (params: GetStationListQueryDTO) => void;
    /** 重置回调函数 */
    onReset: () => void;
    /** 初始搜索参数 */
    initialParams?: GetStationListQueryDTO;
}

/**
 * # 站点搜索表单组件
 * 用于站点列表的搜索和筛选功能
 */
export function StationSearchForm({ onSearch, onReset, initialParams = {} }: StationSearchFormProps) {
    // 搜索表单状态
    const [searchForm, setSearchForm] = useState<GetStationListQueryDTO>({
        name: initialParams.name || '',
        code: initialParams.code || '',
        status: initialParams.status
    });

    const handleInputChange = (field: keyof GetStationListQueryDTO, value: string | number | undefined) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /**
     * 处理表单提交
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 过滤空值
        const params: GetStationListQueryDTO = {};
        if (searchForm.name?.trim()) params.name = searchForm.name.trim();
        if (searchForm.code?.trim()) params.code = searchForm.code.trim();
        if (searchForm.status !== undefined) params.status = searchForm.status;
        
        onSearch(params);
    };

    /**
     * 重置搜索表单
     */
    const handleReset = () => {
        const resetData: GetStationListQueryDTO = {
            name: '',
            code: '',
            status: undefined
        };
        setSearchForm(resetData);
        onReset();
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h3 className="card-title text-lg mb-4">
                    <span className="text-primary">🔍</span>
                    搜索站点
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* 站点名称 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">站点名称</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="请输入站点名称"
                                value={searchForm.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>

                        {/* 站点编码 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">站点编码</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="请输入站点编码"
                                value={searchForm.code || ''}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        </div>

                        {/* 状态 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">运营状态</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={searchForm.status ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value === '' ? undefined : Number(e.target.value);
                                    handleInputChange('status', value);
                                }}
                            >
                                <option value="">全部状态</option>
                                <option value="1">启用</option>
                                <option value="0">停用</option>
                            </select>
                        </div>

                        {/* 搜索按钮 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">&nbsp;</span>
                            </label>
                            <div className="flex gap-2">
                                <button type="submit" className="btn btn-primary flex-1">
                                    <span className="text-sm">🔍</span>
                                    搜索
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-outline"
                                    onClick={handleReset}
                                >
                                    <span className="text-sm">🔄</span>
                                    重置
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 